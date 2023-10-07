import React, { useState,useEffect } from "react";
import {Form,Input, message, Modal, Select, Table,DatePicker } from "antd";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import {UnorderedListOutlined,AreaChartOutlined} from '@ant-design/icons'
import Spinner from "../components/Layout/Spinner";
import moment from "moment";
import Analytics from "../components/Layout/Analytics";
const {RangePicker}=DatePicker;


const Homepage=()=>{
    const [showModal,setShowModal]=useState(false);
    const [loading,setLoading]=useState(false);
    const [allTransactions,setAllTransactions]=useState([]);
    const [frequency,setFrequency]=useState('7');
    const [selectedDate,setSelectedDate]=useState([]);
    const [type,setType]=useState('all');
    const [viewData,setViewData]=useState('table');

    //table content
    
    const columns=[
       {
        title:'Date',
        dataIndex:'date',
        render:(text)=><span>{moment(text).format('YYYY-MM-DD')}</span>
       },
       {
        title:'Amount',
        dataIndex:'amount'
       },
       {
        title:'Type',
        dataIndex:'type'
       },
       {
        title:'Category',
        dataIndex:'category'
       },
       {
        title:'Description',
        dataIndex:'description'
       },
       {
        title:'Reference',
        dataIndex:'reference'
       },
       
       
       
       

    ];
    

    //get all transactions
    
    //useEffect hook
    useEffect(()=>{const getAllTransactions=async()=>{
        try{
            const user=JSON.parse(localStorage.getItem('user'))
            setLoading(true)
            const res=await axios.post('/transactions/get-transaction',{
                userid:user._id,frequency,selectedDate,type
            })
            setLoading(false)
            setAllTransactions(res.data)
            console.log(res.data);
        }catch(error){
             console.log(error);
             message.error("Fetch issues with Transaction");
        }
    }
        getAllTransactions();
    },[frequency,selectedDate,type])

    //form handling
    const handleSubmit=async(values)=>{
        try{
            const user=JSON.parse(localStorage.getItem('user'))
            setLoading(true)
            await axios.post('/transactions/add-transaction',{...values,userid:user._id})
            setLoading(false)
            message.success('Transaction added successfuly')
            setShowModal(false)
            

        }catch(error){
            setLoading(false)
            message.error('Failed to add transaction')
        }
    };
    
    return(
        <Layout>
            {loading && <Spinner/>}
                <div className="filters">
                    <div>
                       <h6> Select Date</h6>
                       <Select value={frequency} onChange={(values)=>setFrequency(values)}>
                        <Select.Option value='7'>Last 1 week</Select.Option>
                        <Select.Option value='30'>Last 1 month</Select.Option>
                        <Select.Option value='365'>Last 1 year</Select.Option>
                        <Select.Option value='custom'>custom</Select.Option>
                       </Select>
                       {frequency==="custom" &&(
                        <RangePicker
                        value={selectedDate}
                        onChange={(values)=>setSelectedDate(values)}/>
                       )}
                        </div>
                        <div>
                       <h6> Select Type</h6>
                       <Select value={type} onChange={(values)=>setType(values)}>
                        <Select.Option value='all'>All</Select.Option>
                        <Select.Option value='income'>Income</Select.Option>
                        <Select.Option value='expense'>Expense</Select.Option>
                        
                       </Select>
                      
                        </div>
                        <div className=" switch-icon">
                            <UnorderedListOutlined className={`mx-2  ${viewData==='table'?'active-icon':'inactive-icon'}`} 
                             onClick={()=> setViewData('table')} />
                            <AreaChartOutlined className={`mx-2 ${viewData==='chart'?'active-icon':'inactive-icon'}`} 
                              onClick={()=>setViewData('chart')}/>

                        </div>
                    <div>
                        <button
                         className="btn btn-primary" 
                         onClick={()=>setShowModal(true) }>
                            Add New
                         </button>
                    </div>
                </div>
                <div className="content">
                    {viewData==='table'?(<Table columns={columns} dataSource={allTransactions} />
                    ):(
                        <Analytics allTransactions={allTransactions}/>

                    )}
                    
                     </div>
                       <Modal title="Add Transaction" open={showModal}
                       onCancel={()=>setShowModal(false)}
                       footer={false}>
                        <Form Layout="vertical" onFinish={handleSubmit}>
                                <Form.Item label="Amount" name="amount">
                                <Input type="text" />
                                </Form.Item>
                                <Form.Item label="type" name="type">
                                <Select style={{width:'10 rem'}}>
                                    <Select.Option value="income">Income</Select.Option>
                                    <Select.Option value="expense">Expense</Select.Option>
                                </Select>
                                </Form.Item>
                                <Form.Item label="Category" name="category">
                                <Select>
                                    <Select.Option value="Cash Reward">Cash Reward</Select.Option>
                                    <Select.Option value="Reimbursements">Reimbursements</Select.Option>
                                    <Select.Option value="Registration">Registration fees</Select.Option>
                                    <Select.Option value="Costume">Costume</Select.Option>
                                    <Select.Option value="Props">props</Select.Option>
                                    <Select.Option value="technicals">technicals</Select.Option>
                                    <Select.Option value="instruments">instruments</Select.Option>
                                    <Select.Option value="instruments">travel</Select.Option>
                                    <Select.Option value="other">Others</Select.Option>
                                </Select>
                                </Form.Item>
                                <Form.Item label="Date" name="date">
                                <Input type="date" />
                                </Form.Item>
                                <Form.Item label="Description" name="description">
                                <Input type="text" />
                                </Form.Item>
                                <Form.Item label="Reference" name="reference">
                                <Input type="text" />
                                </Form.Item>
                                <div type="submit" className="d-flex justify-content-end">
                                    <button className="btn btn-primary">
                                    {" "}
                                    SAVE
                                    </button>
                                </div>

                            </Form>

                       </Modal>
               
                
                

        </Layout>
              
    
           
        
            
        
    );
};
export default Homepage;