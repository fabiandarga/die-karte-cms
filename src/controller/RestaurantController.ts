import { type Request, Response, NextFunction, RequestHandler } from 'express';
import { Payload,  } from 'payload';
import { Restaurant } from '../payload-types';

type ModifiedRequest = Request & { payload: Payload };

export async function getRestaurantBySlug({ payload, params }: ModifiedRequest, res: Response) {
    const { slug } = params;
    const result = await payload.find<Restaurant>({
      collection: 'restaurants',
      depth: 2,
      page: 1,
      limit: 1,
      where: { slug: { equals: slug} },
    });

    if (!result.docs.length) {
      res.status(404).send('Restaurant not found');
      return;
    }

    res.send(result.docs[0]);
}
  
  export default { getRestaurantBySlug };
  