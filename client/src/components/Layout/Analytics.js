import react from "react";
import Card from 'react-bootstrap/Card';
import { Progress } from 'antd';
const Analytics=({allTransactions})=>{
    const totalTRansactions=allTransactions.length
    const totalIncome=allTransactions.filter(transaction=>transaction.type ==='income');
    const totalExpense=allTransactions.filter(transaction=>transaction.type ==='expense');
    const totalIncomePercent=(totalIncome.length/totalTRansactions)*100;
    const totalExpensePercent=(totalExpense.length/totalTRansactions)*100;
    const totalTurnover= allTransactions.reduce((acc,transaction)=> acc + transaction.amount,0);
    const totalIncomeTurnover=allTransactions.filter(
        (transaction) =>transaction.type==="income"
    ).reduce((acc,transaction)=> acc+ transaction.amount,0);

    const totalExpenseTurnover= allTransactions.filter(
        (transaction) =>transaction.type==="expense"
    ).reduce((acc,transaction)=> acc+ transaction.amount,0);

    const totalIncomeTurnoverpercent=(totalIncomeTurnover/totalTurnover)*100;
     const totalExpenseTurnoverpercent=(totalExpenseTurnover/totalTurnover)*100;


    return(
        <>
        <div className="container">
        <Card className="row m-3" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Total Transaction: {totalTRansactions}</Card.Title>
        <Card.Text>
        <h5 className="text-success"> Income:{totalIncome.length}</h5>
        <h5 className="text-danger"> Expense:{totalExpense.length}</h5>
          
        </Card.Text>
        <div>
        <Progress type="circle" 
        strokeColor={'green'} 
         className='mx-2'
         percent={totalIncomePercent.toFixed(0)}/>
        
        <Progress type="circle" 
        strokeColor={'red'} 
         className='mx-2'
         percent={totalExpensePercent.toFixed(0)}/>

            
       
    </div>
        </Card.Body>
    </Card>
   <Card className="row m-3" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Total Turnover: {totalTurnover}</Card.Title>
        <Card.Text>
        <h5 className="text-success"> Income:{totalIncomeTurnover}</h5>
        <h5 className="text-danger"> Expense:{totalExpenseTurnover}</h5>
          
        </Card.Text>
        <div>
        <Progress type="circle" 
        strokeColor={'green'} 
         className='mx-2'
         percent={totalIncomeTurnoverpercent.toFixed(0)}/>
        
        <Progress type="circle" 
        strokeColor={'red'} 
         className='mx-2'
         percent={totalExpenseTurnoverpercent.toFixed(0)}/>

            
       
    </div>
        </Card.Body>
    </Card>
    </div>
   
        </>
    );
};
export default Analytics;