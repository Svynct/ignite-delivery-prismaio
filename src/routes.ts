import { Router } from "express";

import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/accounts/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/accounts/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllAvailableDeliveriesController } from "./modules/deliveries/useCases/findAllAvailableDeliveries/FindAllAvailableDeliveriesController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { FindAllDeliveriesController } from "./modules/clients/deliveries/FindAllDeliveriesController";
import { FindAllDeliverymanDeliveriesController } from "./modules/deliveryman/deliveries/FindAllDeliverymanDeliveriesController";
import { UpdateDeliveryEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateDeliveryEndDateController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableDeliveriesController = new FindAllAvailableDeliveriesController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllClientDeliveriesController = new FindAllDeliveriesController();
const findAllDeliverymanDeliveriesController = new FindAllDeliverymanDeliveriesController();
const updateDeliveryEndDateController = new UpdateDeliveryEndDateController();

routes.post("/clients", createClientController.handle);
routes.post("/clients/authenticate", authenticateClientController.handle);
routes.get("/clients/deliveries", ensureAuthenticateClient, findAllClientDeliveriesController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);
routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, findAllDeliverymanDeliveriesController.handle);
routes.post("/deliveries", ensureAuthenticateClient, createDeliveryController.handle);
routes.get("/deliveries", ensureAuthenticateDeliveryman, findAllAvailableDeliveriesController.handle);
routes.put("/deliveries/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle);
routes.put("/deliveries/complete/:id", ensureAuthenticateDeliveryman, updateDeliveryEndDateController.handle);

export { routes };