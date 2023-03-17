import { TypeWithID } from 'payload/dist/collections/config/types';
import type { FieldHook } from 'payload/types';
import { Category } from '../payload-types';
import payload, { Payload } from 'payload';
import { CollectionAfterDeleteHook } from 'payload/types';


type OrderFieldHook<T extends TypeWithID> = FieldHook<T, number, T>;

export const sortedCategoriesHook: OrderFieldHook<Category> = async (
  args
) => {
  const { value, originalDoc, operation, req } = args;

  const newOrder = value < 1 ? 1 : value; // prevent zero or negative

  if (operation == 'create') {
    const categories = await payload.find<Category>({
      collection: 'categories',
      limit: 1,
      sort: '-order',
    });

    const nextOrdinal = categories.docs.length
      ? categories.docs[0].order + 1
      : 1;
    return nextOrdinal;
  }

  if (operation == 'update') {
    if (req.user === 'hook') {
      return value;
    }
    const originalNumber = originalDoc.order;
    const diff = newOrder - originalNumber; // - is decreasing; + is increasing
    const direction = diff / Math.abs(diff);
    const move = -1 * direction;
    if (diff === 0) {
      return newOrder; // no change
    }

    const from = diff < 0 ? newOrder : originalNumber + 1;
    const to = diff < 0 ? originalNumber - 1 : newOrder;

    // find all docs between old and new number and increase/decrease them
    const categories = await payload.find<Category>({
      collection: 'categories',
      limit: 100,
      where: {
        and: [
          { restaurant: { equals: originalDoc.restaurant } },
          { order: { greater_than_equal: from } },
          { order: { less_than_equal: to } },
        ],
      },
      sort: '-order',
    });

    if (!categories.docs.length) {
      return newOrder;
    }

    await Promise.all(
      categories.docs.map((cat) => {
        return payload.update({
          collection: 'categories',
          id: cat.id,
          data: {
            order: cat.order + move,
          },
          overrideAccess: true,
          user: 'hook',
        });
      })
    );

    // edge case: can not be higher than last highest
    const highestOrder = categories.docs[0].order;
    if (newOrder > highestOrder) {
      console.log('highestOrder', originalNumber, value);
      return highestOrder;
    }
  }
  console.log('reached the end', value);
  return value; // should return a string as typed above, undefined, or null
};

export const afterDeleteHook: CollectionAfterDeleteHook = async ({ doc }) => {
  console.log('delete operation');

  const categories = await payload.find<Category>({
    collection: 'categories',
    limit: 1000,
    where: {
      and: [
        { restaurant: { equals: doc.restaurant } },
        { order: { greater_than: doc.order } },
      ],
    },
  });
  await Promise.all(
    categories.docs.map((cat) => {
      return payload.update({
        collection: 'categories',
        id: cat.id,
        data: {
          order: cat.order - 1, // all have to be moved up one (decrease order)
        },
        overrideAccess: true,
        user: 'hook',
      });
    })
  );
};
