import {DataTypes, DATE, Op} from "sequelize";

require('dotenv').config();
import * as HttpError  from "http-errors";
import validate from '../configurations/validate';
import * as JWT from "jsonwebtoken";
import {Users} from '../database';
import * as md5 from "md5";
const {JWT_SECRET} = process.env;
class UsersController {

  static async signUp(req, res, next) {
    try {
      await validate(req.body, {
        email: 'required|email',
        name: 'required|string',
        phone: 'required|numeric',
        password: 'required|string',
        admin: 'boolean'
      }, {});
      const {
        email, 
        name,
        phone,
        password,
        admin
      } = req.body;
      let date = new Date()
      let timeSlot = date.getTime()
      let checkSlot = Math.floor(timeSlot/10000);
      let floorSlot = checkSlot+'0000';
      let topSlot = checkSlot+'9999';
      const emailExist = await Users.findOne({ where: {email}});
      if (emailExist) {
        return next(HttpError(400, "Email already use"));
      }
      const detectedUsers = await Users.findAll({ where: {'timeSlot' : { [Op.between]: [floorSlot, topSlot] }}});
      if(detectedUsers.length > 0){
        return next(HttpError(400, "Sorry you try again"));
      }
      const newUser = await Users.create({
        email,
        name,
        phone,
        admin,
        timeSlot,
        password: md5(password)
      })

      return res.status(200).send({
        status: "success",
        message: 'User success created',
        newUser,
      });

    } catch (e) {
      next(e)
    }
  };

    static async signIn(req, res, next) {
    try {
      await validate(req.body, {
        email: 'required|email',
        password: 'required|string',
      },{});
      const {
        email,
        password
      } = req.body;

      const userData = await Users.findOne({ where: {
        email,
        password: md5(password),
      }})

      if (!userData) return (HttpError(400, "Invalid user or password"));

      const token = JWT.sign({id: userData.id}, JWT_SECRET);

      return res.status(200).send({
        status: "success",
        message: 'User success login',
        userData,
        token,
      });

    } catch (e) {
      next(e)
    }
  };

      static async destroy(req, res, next) {
    try {
      await validate(req.params, {
        id: 'required|numeric',
      },{});
      const {id} = req.params;

      const userData = await Users.destroy({where: {id}});

      return res.status(200).send({
        status: "success",
        message: 'User success deleted',
        userData,
      });

    } catch (e) {
      console.log(e);
      next(e)
    }
  };

  static async list(req, res, next) {
    try {
      const userData = await Users.findAll();

      return res.status(200).send({
        status: "success",
        message: 'Users list',
        userData,
      });

    } catch (e) {
      console.log(e);
      next(e)
    }
  };

}
export  default UsersController;