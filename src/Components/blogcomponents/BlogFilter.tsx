import './blogfilter.css'
import Button from "../shared/components/FormElements/Button"
export default function BlogFilter({handleSearchParams,category}){





    return(
        <>
         <Button cssClass={!category ? 'active':''} onClick={() => handleSearchParams(null)}>
                    All
                </Button>
                  <Button 
                  cssClass={category === 'Exploration' ? 'active':''}
                  onClick={() =>
                    handleSearchParams('Exploration')
                }>
                    Exploration
                </Button>
                <Button cssClass={category === "Photography" ? 'active':''} onClick={() => handleSearchParams('Photography')}>
                    Photography
                </Button>
                <Button
                cssClass={category === "History" ? 'active':''}
                onClick={() => handleSearchParams('History')}>
                History
                </Button>
          
        
        </>
    )
}