import * as HttpError  from "http-errors";
import {Users} from '../database';
require('dotenv').config();
import * as JWT from "jsonwebtoken";
const {JWT_SECRET} = process.env;

async function role(req, res, next) {
  try {

    const paths = [
      "/api/hairdresser/list",
    ];
    if (paths.includes(req.originalUrl)) {
      return next();
    }

    const token = req.headers['x-authorization'];

    if (token) {
      const decoded = JWT.verify(token, JWT_SECRET);
      const id = decoded['id'];

      if (!id) {
        next (HttpError(401, 'Unauthorized'));
      }

      const userData = await Users.findByPk(id);
      if (!userData) {
        next (HttpError(401, 'Unauthorized'));
      }

      if(userData.admin) {
        req.user = userData;
        return next();
      }else{
        next (HttpError(401, 'Unauthorized for this endpoint'));
      }

      next (HttpError(401, 'Unauthorized'));

    }

    next (HttpError(401, 'Unauthorized'));

  } catch (e) {
    return next(e)
  }
}

export default role;
