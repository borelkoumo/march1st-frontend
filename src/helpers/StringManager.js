export class StringManager {
  static async ascendingOrder(arrayObject, param) {
    arrayObject.sort((a,b)=>{
      if(a[param]<b[param]) return -1;
      if(b[param]<a[param]) return 1;
      return 0;
    })
    return arrayObject;
  }
  static async descendingOrder(arrayObject, param) {
    arrayObject.sort((a,b)=>{
      if(a[param]>b[param]) return -1;
      if(b[param]>a[param]) return 1;
      return 0;
    })
    return arrayObject;
  }
}
