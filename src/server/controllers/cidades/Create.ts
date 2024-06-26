import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

interface Icidade {
    nome:string;
    estado: string;
}

const bodyValidation: yup.ObjectSchema<Icidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3),

});

// eslint-disable-next-line @typescript-eslint/ban-types
export const create = async (req: Request<{}, {}, Icidade>, res: Response) => {

    let validatedData: Icidade | undefined;

    try{
        validatedData = await bodyValidation.validate(req.body, {abortEarly: false});
    }catch (err) {
        const yupError = err as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach(error => {
            if (error.path === undefined) return;
            errors[error.path] = error.message;
        })

        return res.status(StatusCodes.BAD_REQUEST).json ({errors})
    }

    console.log(validatedData);

    return res.send('Create!');
};