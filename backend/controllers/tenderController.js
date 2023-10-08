const Tender = require("../models/tenderModel");
const mongoose = require("mongoose");

//get all tender
const getTenders = async (req, res) => {
  const tender = await Tender.find({});
  res.json(tender);
};

//get single tender
const getTender = async (req, res) => {
  const tender = await Tender.find({tID: req.params.id});
  res.json(tender)
};

//create new tender
const createTender = async (req, res) => {
  
  const checkTender = await Tender.findOne({tID: req.body.tID});
  
  if(checkTender){
    return res.json({message: "Tender with this tID already exists", success: false});
  }
  
  const tender = req.body;

  const newTender = new Tender({
    tID: tender.tID,
    state: tender.state,
    category: tender.category,
    title: tender.title,
    value: tender.value,
    document: tender.document,
    closeDate: tender.closeDate
  })

  await newTender.save().then( (tender) =>{
    res.json({tender, success: true});
  }).catch((err)=>{
    res.json({message: "error", success: false});
    console.log(err);
  })
};

//delete tender
const deleteTender = async (req, res) => {
   const result = await Tender.findOneAndDelete({tID: req.params.id});
  
   if(!result)
    return res.json({message: "Wrong tID or Tender Doesn't Exist!"})

   res.json({message: "Tender deleted!", tender: result});
};

//update tender
const updateTender = async (req, res) => {
  const tID = req.params.id;
  const result = await Tender.findOneAndUpdate({tID: tID},{...req.body});

  if(!result)
    return res.json({message: "Something Went Wrong"})

  res.json({message: "Tender Updated!"});
};

module.exports = {
  getTenders,
  getTender,
  createTender,
  deleteTender,
  updateTender,
};
