import { isJSON } from '../../services/common/common.service';

export const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || entity.statusCode || 200);
    if(entity.data){
      res.json(JSON.parse(entity.data));
    }else{
      res.json(entity);
    }
    
  }
  return null
}

export const notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

export const authorOrAdmin = (res, user, userField) => (entity) => {
  if (entity) {
    const isAdmin = user.role === 'admin'
    const isAuthor = entity[userField] && entity[userField].equals(user.id)
    if (isAuthor || isAdmin) {
      return entity
    }
    res.status(401).end()
  }
  return null
}
