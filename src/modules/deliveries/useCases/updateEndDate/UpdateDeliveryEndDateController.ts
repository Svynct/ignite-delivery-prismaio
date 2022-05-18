import { Request, Response } from "express";

import { UpdateDeliveryEndDateUseCase } from "./UpdateDeliveryEndDateUseCase";

export class UpdateDeliveryEndDateController {
  async handle(request: Request, response: Response) {
    const { id: id_delivery } = request.params;
    const id_deliveryman = request.id_deliveryman;

    const updateDeliverymanUseCase = new UpdateDeliveryEndDateUseCase();
    const result = await updateDeliverymanUseCase.execute({
      id_delivery,
      id_deliveryman
    })

    return response.json(result);
  }
}