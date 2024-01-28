export function cloneDeep(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      const newArray = [];
      for (let i = 0; i < obj.length; i++) {
        newArray[i] = cloneDeep(obj[i]);
      }
      return newArray;
    }
  
    if (typeof obj === 'object') {
      const newObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = cloneDeep(obj[key]);
        }
      }
      return newObj;
    }
  }
  
 