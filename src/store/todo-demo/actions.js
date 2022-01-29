import {database} from "src/boot/dexie"

export const get = async (context, id) => {
  try {
    if (id == null) {
      return await database.todo.orderBy("id").toArray();
    } else {
      return await database.todo.get(Number(id));
    }
  } catch (error) {
    throw error;
  }
};


export const count = async (context) => {
  try {
    return database.todo.count();
  } catch (error) {
    throw error;
  }
};

export const create = async (context, data) => {
  try {
    return database.todo.add(data);
  } catch (error) {
    throw error;
  }
};

export const update = async (context, data) => {
  try {
    return database.todo.update(data.id, data);
  } catch (error) {
    throw error;
  }
};

export const remove = async (context, id) => {
  try {
    return database.todo.delete(Number(id));
  } catch (error) {
    throw error;
  }
};

export const clean = async (context, id) => {
  try {
    return database.todo.clear();
  } catch (error) {
    throw error;
  }
};


