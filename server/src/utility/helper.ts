import { Model } from 'mongoose'; 

async function getLatestId(model: Model<any>, idField: string): Promise<number> {
  try {
    const lastDoc = await model.findOne({}, {}, { sort: { [idField]: -1 } });
    return lastDoc ? lastDoc[idField] : 1000;
  } catch (error) {
    console.error(`Error initializing last ${model.modelName} ID:`, error);
    throw error;
  }
}


export default getLatestId;
