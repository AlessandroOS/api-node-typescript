import { Request, Response } from "express";

interface Icidade {
    nome:string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const create = (req: Request<{}, {}, Icidade>, res: Response) => {

    console.log(req.body);

    return res.send('Create!');
};