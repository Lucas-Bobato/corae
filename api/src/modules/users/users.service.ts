import * as repo from "./users.repo";

export function listUsers(skip?: number, take?: number) {
  return repo.list(skip, take);
}

export function getUser(id: number) {
  return repo.byId(id);
}

export function createUser(data: { name: string; email: string; password: string }) {
  return repo.create(data);
}

export function updateUser(data: { name?: string; email?: string; password?: string }, id: number) {
  return repo.update(data, id);
}

export function deleteUser(id: number) {
  return repo.deleteUser(id);
}

export function login(email: string, password: string) {
  return repo.login(email, password);
}

export function logout(token: string) {
  return repo.logout(token);
}