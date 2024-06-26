import { Request, Response } from "express";
import * as yup from 'yup';

interface Icidade {
    nome:string;
}

const bodyValidation: yup.ObjectSchema<Icidade> = yup.object().shape({
    nome: yup.string().required().min(3),

});

// eslint-disable-next-line @typescript-eslint/ban-types
export const create = async (req: Request<{}, {}, Icidade>, res: Response) => {

    let validatedData: Icidade | undefined;

    try{
        validatedData = await bodyValidation.validate(req.body);
    }catch (error) {
        const yupError = error as yup.ValidationError;

        return res.json ({
            errors: {
                default: yupError.message,
            }
        })
    }

    console.log(validatedData);

    return res.send('Create!');
};