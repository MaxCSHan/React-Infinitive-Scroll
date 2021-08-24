import {get} from '../utilities/apiHelper';


const getPhotoList = ({page,limit}:{page:number,limit:number}) => get<any>(`/list`,{page,limit});

const getPhotoListLimit4 = (page:number) => getPhotoList({page,limit:4});



export {getPhotoList,getPhotoListLimit4};