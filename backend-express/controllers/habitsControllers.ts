import { type Request, type Response } from 'express';

export const getUserHabits = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      data: 
        [ 
          {
          _id: "5f50c31e1c4ae0b63c4b4a94",
          user_id: "123456",
          title: "Sleep",
          slug:"/sleep",
          description: "Lights out at 10pm",
          color:"#7dd3fc",
          bgcolor: "#3b82f6",
          icon: undefined,
          successIcon: "1f4a4",
          errorIcon: "1f440",
          created_at: "2023-09-08T12:34:56Z",
          days: undefined
        }
      ],
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while fetching habits',
    });
  }
};

