import { type Request, type Response } from 'express';

export const testENV = async (req: Request, res: Response): Promise<void> => {

  const BASE_URL = process.env.BASE_URL

  try {
    res.status(200).json({
      data: {
        baseURL: BASE_URL,
      }
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while fetching habits',
    });
  }
};

