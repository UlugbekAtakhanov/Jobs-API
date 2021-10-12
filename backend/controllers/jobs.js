const Job = require("../models/Job")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, NotFoundAPIError} = require("../errors/index")

// we can get all jobs from DB
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({}).sort("createdAt")
    res.status(StatusCodes.OK).json({count: jobs.length, jobs})
}

// in order to get one single job, we need job's id, and can we get it from getAllJobs
const getJob = async (req, res) => {
    const {user: {userId}, params: {id: jobId}} = req
    const job = await Job.findOne({_id: jobId, createdBy: userId})
    if (!job) {
        throw new NotFoundAPIError(`No job with this ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
    // we do not provide createdBy (userID), we already have userId in "req.user from auth middleware"
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
    const {user: {userId}, params: {id: jobId}, body: {company, position}} = req

    if (company === ""  || position === "") {
        throw new BadRequestError("Company or position cannot be empty")
    }
    
    const job = await Job.findByIdAndUpdate({_id: jobId, createdBy: userId}, req.body, {new: true, runValidators: true})
    if(!job) {
        throw new NotFoundAPIError(`No job with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req, res) => {
    const {params: {id: jobId}, user: {userId}} = req
    const job = await Job.findByIdAndDelete({_id: jobId, createdBy: userId})
    if (!job) {
        throw new NotFoundAPIError(`No job with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).send({msg: "job is deleted"})
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}