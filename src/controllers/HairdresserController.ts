import * as HttpError  from "http-errors";
import validate from '../configurations/validate';
import * as JWT from "jsonwebtoken";
import {Hairdressers} from '../database';
import * as md5 from "md5";

class HairdresserController {

  static async create(req, res, next) {
    try {
      await validate(req.body, {
        email: 'required|email',
        name: 'required|string',
        phone: 'required|numeric',
        spec: 'required|string',
        freeTimeSlots: 'required|date'
      }, {});
      const {
        email, 
        name,
        phone,
        spec,
        freeTimeSlots
      } = req.body;

      const emailExist = await Hairdressers.findOne({ where: {email}});
      if (emailExist) {
        return next(HttpError(400, "Email already use"));
      }
      const newHairdresser = await Hairdressers.create({
        email,
        name,
        phone,
        spec,
        freeTimeSlots
      })

      return res.status(200).send({
        status: "success",
        message: 'Hairdresser successfully created',
        newHairdresser,
      });

    } catch (e) {
      next(e)
    }
  };

 static async update (req, res, next) {
    try {
      await validate(req.params, {
        id: 'required|string',
      },{});
      const {id} = req.params;
      await validate(req.body, {
        email: 'required|email',
        password: 'required|string',
        name: 'required|string',
        phone: 'required|numeric',
        spec: 'required|string',
        freeTimeSlots: 'required|date',
      },{});

      const hairdresserData = await Hairdressers.findByPk(id);

      if (!hairdresserData) return (HttpError(400, "Not found any hairdresser"));
      const hairdresserUpdatedData = await hairdresserData.update(req.body);

      return res.status(200).send({
        status: "success",
        message: 'Hairdresser successfully updated',
        hairdresserUpdatedData,
      });

    } catch (e) {
      next(e)
    }
  };

  static async destroy(req, res, next) {
    try {
      await validate(req.params, {
        id: 'required|string',
      },{});
      const {id} = req.params;

      const hairdresserData = await Hairdressers.destroy({where: {id}});

      return res.status(200).send({
        status: "success",
        message: 'Hairdresser successfully deleted',
        hairdresserData,
      });

    } catch (e) {
      console.log(e);
      next(e)
    }
  };

  static async list(req, res, next) {
    try {
      const hairdresserData = await Hairdressers.findAll();

      return res.status(200).send({
        status: "success",
        message: 'Hairdresser list',
        hairdresserData,
      });

    } catch (e) {
      console.log(e);
      next(e)
    }
  };

}
export  default HairdresserController;