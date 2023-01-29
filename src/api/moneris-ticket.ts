import { environment } from "src/environments/environment";
import { Request, Response } from "express";
import axios, { AxiosError } from "axios";
//POST
const get_moneris_ticket_api = async (req: Request, res: Response) => {
  try {
    const { data } = await axios.post<{ response: { ticket: string } }>(
      environment.moneris_server,
      req.body
    );
    if (data.response?.ticket?.length) {
      return res.status(200).json({
        success: true,
        ticket: data?.response?.ticket,
      });
    }
    console.error(data);
    throw new Error();
  } catch (e) {
    const err = e as AxiosError;
    console.error(err.response);
    return res.status(200).json({
      success: false,
      ticket: null,
    });
  }
};
export default get_moneris_ticket_api;
