
import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
}

// BuildNew Categories

// const buildNewCategories = (parentId, categories, category) => {
    
//     let myCategories = [];
//     for (let cat of categories) {
//         if (cat._id === parentId) {

//             //   push into myCategories
//             myCategories.push({
//                 ...cat,
//                 // if there is children the put into sub Category
//                 children: cat.children.length > 0 ? buildNewCategories(parentId,[...cat.children],{
//                     _id: category._id,
//                     name: category.name,
//                     slug: category.slug,
//                     parentId: category.parentId,
//                     children: category.children
//                 }, category) : []
//             })
//         } else {
//             //   push into myCategories
//             myCategories.push({
//                 ...cat,
//                 // if there is children the put into sub Category
//                 children: cat.children.length > 0 ? buildNewCategories(parentId,cat.children, category) : []
//             })

//         }

//     }
//     return myCategories;
// }

// buildNewNested Categories
const buildNewNewNestedCategory = (parentId,categories,category) =>{
    const myCategories = [];

    //   in case there is no chid like flight have not childer
    //  it going to return it self like parent
     if(parentId === undefined){
        //  it going to retrun new array
        return [
            ...categories,
            {
             _id:category._id,
             name: category.name,
             slug: category.slug,
             children:[]
            }
        ];
     }
    for(let cat of categories){
            // mobile_id == parentid  /
            // category is newly careated
        if(cat._id === parentId){
            const newCategory = {
                _id:category._id,
                    name:category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: []
            };
            myCategories.push({
                ...cat,
                children:cat.children.length > 0 ? [...cat.children,newCategory] : [newCategory]

            })
        }else{

             myCategories.push({
            ...cat,
            children:cat.children ?  buildNewNewNestedCategory(parentId,cat.children,category) : []
        })
        }

    }
    return myCategories;
}
export default(state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
                loading: false,
            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;


        case categoryConstants.ADD_CATEGORTY_SUCCESS:
            const category = action.payload.category;
            console.log("\n\n\n====> category : ", category)
            // const updatedCategories = buildNewCategories(category.parentId ,state.categories, category );
            const updatedCategories = buildNewNewNestedCategory(category.parentId ,state.categories, category );
            console.log(updatedCategories);
            state = {
                ...state,
                // pusing into categories []
                ...state,
                categories: updatedCategories,
                loading: false,

            }
            break;
        case categoryConstants.ADD_CATEGORTY_FAILURE:
            state = {
                ...initState,

            }
            break;
        default:
            break;


    }
    return state;
}