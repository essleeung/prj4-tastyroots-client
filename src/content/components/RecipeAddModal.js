import React, { useState } from 'react';
import { Button, Form, Header, Icon, Modal } from 'semantic-ui-react'
import RecipeAddStepsInModal from '../components/RecipeAddStepsInModal'
import RecipeAddIngredientsModal from './RecipeAddIngredientsModal';
import RecipePics from './RecipePics'
import { Redirect } from 'react-router-dom'
import { CLOUDINARY_DEFAULT_IMG } from './CloudinaryImageConst'

const RecipeAddModal = props => {

    let [message, setMessage] = useState()
    let [recipeStatus, setRecipeStatus] = useState(false)
    let [recipeName, setRecipeName] = useState()
    let [description, setDescription] = useState()
    let [servings, setServings] = useState(2)
    let [prepTime, setPrepTime] = useState()
    let [cookTime, setCookTime] = useState()

 
    let [steps, setSteps] = useState([])
    let [step, setStep] = useState()
    let [ingredients, setIngredients] = useState([])
    let [ingredientName, setIngredientName] = useState()
    let [ingredientUnit, setIngredientUnit] = useState()
    let [ingredientQuantity, setIngredientQuantity] = useState()
    let [redirect, setRedirect] = useState(false)

    let [imageUrl, setImageUrl] = useState()

    const servingsOptions = [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 },
        { text: '6', value: 6 },
        { text: '7', value: 7 },
        { text: '8', value: 8 },
        { text: '9', value: 9 },
        { text: '10', value: 10 },
        { text: '11', value: 11 },
        { text: '12', value: 12 }
    ]

    const unitOptions = [
        { text: 'piece', value: 'piece' },
        { text: 'each', value: 'each' },
        { text: 'tsp', value: 'tsp' },
        { text: 'tbsp', value: 'tbsp' },
        { text: 'cup', value: 'cup' },
        { text: 'ounce', value: 'ounce' },
        { text: 'lb', value: 'lb' },
        { text: 'grams', value: 'grams' },
        { text: 'miligrams', value: 'miligrams' },
        { text: 'fluid-ounce', value: 'fluid-ounce' },
        { text: 'fluid-cup', value: 'fluid-cup' },
        { text: 'pint', value: 'pint' },
        { text: 'quart', value: 'quart' },
        { text: 'gallom', value: 'gallon' },
        { text: 'litre', value: 'litre' },
        { text: 'mililitre', value: 'mililitre' },
        { text: 'stick', value: 'stick' },
        { text: 'packet', value: 'packet' },
    ]

    /*********************   Adding and Removing Ingredient fields on form ********************/
    const handleIngredientQuantityChange = (e, index) => {
        ingredients[index].qty = e.target.value
        setIngredientQuantity(ingredients[index].qty)
        setIngredients(ingredients)
    }

    const handleIngredientUnitChange = (e, data, index) => {
        ingredients[index].unit = data.value
        console.log('options value', data.value)
        setIngredientUnit(ingredients[index].unit)
        setIngredients(ingredients)
    }

    const handleIngredientNameChange = (e, index) => {
        ingredients[index].name = e.target.value
        setIngredientName(ingredients[index].name)
        setIngredients(ingredients)
    }


    const addNewIngredient = () => {
        console.log('clicked for add new ingredient')
        console.log('ingredients', ingredients)
        setIngredients([...ingredients, { qty: 0, unit: '', name: '' }])
    }

    const handleRemoveIngredient = (index) => {
        let newIngredients = [...ingredients]
        newIngredients.splice(index, 1)
        setIngredients(newIngredients)
    }

    /*********************   Adding and removing Steps field on form ********************/
    const handleStepChange = (e, index) => {
        steps[index] = e.target.value
        setStep(steps[index])
        setSteps(steps)
    }

    const addSteps = (e) => {
        setSteps([...steps, ''])
    }

    const handleRemoveSteps = (index) => {
        console.log('steps', steps)
        console.log('index to be removed', index)
        console.log('step at index', steps[index])
        let newSteps = [...steps]
        console.log('newsteps', newSteps)
        newSteps.splice(index, 1)
        console.log('newsteps after removal', newSteps)
        setSteps(newSteps)
    }

    /**************** Submitting the form ***************************************/

    const handleSubmit = (e) => {
        e.preventDefault()
        let creatorId = props.userDetails._id
        // let originalRecipe = props.userDetails._id
        console.log('creator Id', creatorId)
        console.log('Ingredients', ingredients)
        let ing = ingredients.map((ing) => {
            let ingStr = ing.qty + ',' + ing.unit + ',' + ing.name
            return ingStr
        })
        ingredients = ing
        console.log('ingredients in string', ingredients)

        let recipePublic = recipeStatus
        console.log('recipe status public', recipeStatus)
        let pictures = [CLOUDINARY_DEFAULT_IMG]
        if(imageUrl){
             pictures = [imageUrl]
        }
       
        console.log('pictures check cloudinary', pictures)
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'recipe', {
            method: 'POST',
            body: JSON.stringify({
                recipeName,
                description,
                creatorId,
                servings,
                prepTime,
                cookTime,
                ingredients,
                steps,
                recipePublic, 
                pictures
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("Here is the response!", response)
                if (!response.ok) {
                    setMessage(`${response.status} : ${response.statusText}`)
                    return
                }
                response.json().then(result => {
                    console.log("result!", result)
                    

                })
            })
            .catch(err => {
                console.log('ERROR SUBMITTING RECIPE ADD FORM', err)
            })
            .finally(() => {
                setRecipeName('')
                setDescription('')
                setServings('')
                setPrepTime('')
                setCookTime('')
                setIngredients([])
                setSteps([])
                setIngredientName('')
                setIngredientQuantity(0)
                setIngredientUnit('')
                props.updateState ? props.setUpdateState(false) : props.setUpdateState(true)
                document.getElementById("recipeForm").reset();
                setRedirect(true)

            })
    }

    const toggleRecipeStatus = (e, data) => {
        setRecipeStatus(data.checked)
    }

    if (redirect) {
    return <Redirect to="/profile" />
    }
    /**************************************************************************/
    return (

        <Modal id='recipeForm' trigger={<Icon className="burgundy-font" name='add' size='large' content="Add recipe"></Icon>} stackable size="fullscreen" as={Form} onSubmit={(e) => handleSubmit(e)} closeIcon>
            <Header icon='food' className="mauve-font" content='Add new recipe' />
            <Modal.Content>
                <Form.Radio label='Public'
                    onChange={toggleRecipeStatus} slider className="mauve-font"/>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Form.Input fluid label="Recipe Name" name="recipeName" onChange={(e) => setRecipeName(e.target.value)} required />
                    </Form.Field>
                    <Form.Select fluid required label='Servings' options={servingsOptions} name="servings" onChange={(e, data) => setServings(data.value)} placeholder="Servings" />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Form.Input fluid label="Prep Time" name="prepTime" onChange={(e) => setPrepTime(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input fluid label="Cook Time" name="cookTime" onChange={(e) => setCookTime(e.target.value)} />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Form.TextArea fluid label="Description" name="description" onChange={(e) => setDescription(e.target.value)} required />
                    </Form.Field>
                </Form.Group>
                <RecipeAddIngredientsModal ingredients={ingredients} unitOptions={unitOptions} handleIngredientQuantityChange={handleIngredientQuantityChange} handleIngredientUnitChange={handleIngredientUnitChange} handleIngredientNameChange={handleIngredientNameChange} handleRemoveIngredient={handleRemoveIngredient} />
                <Form.Field>
                    <Button className="btn-outline" onClick={addNewIngredient}>Add a new ingredient</Button>
                </Form.Field>
                <RecipeAddStepsInModal steps={steps} handleRemoveSteps={handleRemoveSteps} handleStepChange={handleStepChange} />
                <Form.Field>
                    <Button className="btn-outline" onClick={(e) => addSteps(e)}>Add steps</Button>
                </Form.Field>
                <RecipePics setImageUrl={setImageUrl} imageUrl={imageUrl}/>
            </Modal.Content>
            <Modal.Actions>
                <Button className="mauve-bg white-font" type="submit">Add Recipe</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default RecipeAddModal