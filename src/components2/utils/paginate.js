import _ from 'lodash';

export function paginate (items,pageNumber,pageSize) {
    const startIndex=(pageNumber - 1) * pageSize;
   
   //return _(items).slice(startIndex).take(pageSize).value();
    const movies= _(items).slice(startIndex).take(pageSize).value();
    console.log(movies);
    return movies;
}