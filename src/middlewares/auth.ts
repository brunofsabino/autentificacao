import { Request, Response, NextFunction} from 'express'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/User'

dotenv.config()

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        let sucess = false
        if(req.headers.authorization){

            const [authType, token] = req.headers.authorization.split(' ')
            if(authType === 'Bearer'){
                try {
                    const decoded = JWT.verify(
                        token, 
                        process.env.JWT_SECRETY_KEY as string
                    )
                    sucess = true
                } catch(err) {
                    
                } 
            }

            // let hash: string = req.headers.authorization.substring(6)
            // let decoded: string = Buffer.from(hash, 'base64').toString()
            // let data: string[] = decoded.split(':')
            // if(data.length === 2){
            //     let hasUser = await User.findOne({
            //         where: {
            //             email: data[0],
            //             password: data[1]
            //         }
            //     })
            //     if(hasUser){
            //         sucess = true
            //     }
            // }
        }
        // verificar de auth
        if(sucess) {
            next()
        } else{
            res.status(401).json({ error: "Não autorizado"}) // 403 Not authorized
        }
    }
}