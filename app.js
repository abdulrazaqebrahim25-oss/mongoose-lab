const mongoose = require('mongoose')

// connect to DB 

async function connectToDB() {
    try{

        await mongoose.connect('mongodb+srv://razaqEbrahim25:1234@cluster0.sqqm48o.mongodb.net/recipesDB?appName=Cluster0')
        console.log("Sucess connetion")
    }
    catch(err){
        console.log("Error in connetion to DB", err)
    }
    
}

// call and make sure its working
connectToDB() 

// Schema 


const  recipesSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true    
    }, 
    ingredients: [String], 
    instructions: {type: String},
    prepTime: {type: Number},
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Easy'
    }    
})   


// Model 
const Recipes = mongoose.model('Recipes',recipesSchema) 

// create Recipe function 

async function createRecipe(){
    try{
    const newRecipe= await Recipes.create({
        name: "Um Ali",
        ingredients: ["Puff Pastry","Milk"],
        instructions: "bake at 180C",
        prepTime: 120,
        difficulty: "Medium"

    })

    }
    catch(err){
        console.log("Adding new recipe has error", err)
    }
}

// createRecipe()

async function getAllRecipe(){
    try{
        const getAllRecipes = await Recipes.find({
            name: "Um Ali",
            difficulty: "Medium", 
            prepTime: 120
        })
        console.log(getAllRecipes)
    }
    catch(err){
        console.log("Getting the all recipe has error", err)
    }

}

// getAllRecipe()

async function updateRecipe(){
    try{
        const getAndUpdate = await Recipes.findByIdAndUpdate("6954fbf9e11c37a12e502aa0",{
            name: "Updated Um Ali",
            prepTime: 60
         }, 
        { new: true })

        console.log(getAndUpdate)
    }
    
    catch(err){
        consol.log("The update recipe has error",err)
        }
} 

// updateRecipe() 

async function deleteRecipe(){
    try{
    const deleteRecipe = await Recipes.deleteOne()
    console.log("Recipe successfully deleted.")
    }
    catch(err){
        console.log("The deleting has error", err)
    }
}

// deleteRecipe()

async function getRecipeById(){
    try{
        const recipesByID = await Recipes.findById(
             "6954fbf9e11c37a12e502aa0"
        )
        if(recipesByID !== null){
            console.log(recipesByID)
        }
        else{
            console.log("No recipe with this ID exists.")  
        }
        
    }
    catch(err){
        console.log("Getting the all recipe by id has error", err)
    }

}

// getRecipeById() 

