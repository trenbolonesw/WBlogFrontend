import './blogfilter.css'
import Button from "../shared/components/FormElements/Button"
import { SetURLSearchParams } from 'react-router-dom'


type blogfilter = {
    handleSearchParams:SetURLSearchParams 
    category:string
}

export default function BlogFilter({handleSearchParams,category}:blogfilter){





    return(
        <>
       
         <Button cssClass={!category ? 'active':'normal'} onClick={() => handleSearchParams(undefined)}>
                    All
                </Button>
                  <Button 
                  cssClass={category === 'Exploration' ? 'active':'normal'}
                  onClick={() =>
                    handleSearchParams('Exploration')
                }>
                    Exploration
                </Button>
                <Button cssClass={category === "Photography" ? 'active':'normal'} onClick={() => handleSearchParams('Photography')}>
                    Photography
                </Button>
                <Button
                cssClass={category === "History" ? 'active':'normal'}
                onClick={() => handleSearchParams('History')}>
                History
                </Button>
          
        
        </>
    )
}