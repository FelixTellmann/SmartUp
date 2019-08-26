import express, { Router } from 'express';
import DatabaseModel from './database';
import { ConversionMasterUnit, ConversionUnit, InventoryItem } from './Entities';
import database from '../database';

export default function () {
  const router = Router();
  
  function makeApiRoutes(Entity) {
    const db = new DatabaseModel(Entity, database);
    
    router.get(`/api/${Entity.apiURI()}`, async (req, res) => {
      try {
        res.json(await db.getEntities());
      } catch (err) {
        res.status(400).send(err.message);
      }
    });
    
    router.get(`/api/${Entity.apiURI()}/:id`, async ({ params: { id } }, res) => {
      try {
        res.json(await db.getEntityById(id));
      } catch (err) {
        res.status(400).send(err.message);
      }
    });
    
    router.post(`/api/${Entity.apiURI()}`, async ({ body }, res) => {
      try {
        res.json(await db.createEntity(body));
      } catch (err) {
        res.status(400).send(err.message);
      }
    });
    
    router.patch(`/api/${Entity.apiURI()}/:id`, async ({ params: { id }, body }, res) => {
      try {
        res.json(await db.updateEntity(id, body));
      } catch (err) {
        res.status(400).send(err.message);
      }
    });
    
    router.delete(`/api/${Entity.apiURI()}/:id`, async ({ params: { id } }, res) => {
      try {
        res.json(await db.deleteEntity(id));
      } catch (err) {
        res.status(400).send(err.message);
      }
    });
  }
  
  makeApiRoutes(ConversionMasterUnit);
  makeApiRoutes(ConversionUnit);
  makeApiRoutes(InventoryItem);
  /*  makeApiRoutes(ConversionUnit);
    makeApiRoutes(InventoryItem);
    makeApiRoutes(InventoryItemType);
    makeApiRoutes(Recipe);
    makeApiRoutes(RecipeInstruction);
    makeApiRoutes(RecipeInstruction);*/
  
  return router;
}
