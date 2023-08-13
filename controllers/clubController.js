const clubModel = require("../models/clubModel")
const cloudinary = require("cloudinary").v2
const fs = require("fs")

const createClub = async(req, res) => {
    const {league, clubName,} = req.body
    const result = await cloudinary.uploader.upload(req.file.path)
    const Club = new clubModel({
        league,
        clubName,
        logo: result.secure_url
    })
    try {
       const savedclub = await Club.save()
       if (savedclub){
        res.status(201).json({
            message:" Clubs created sucessfully",
            data: savedclub
        })
       } else {
        res.status(400).json({
            message: "unable to create club "
        })
       }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const getAllClubs = async(req,res) => {
    try {
        const clubs = await clubModel.find()

        res.status(200).json({
            message: "all clubs found " + clubs.length,
            data: clubs
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const getOneClub = async(req, res) => {
   try {
    const club = await clubModel.findById(req.params.id)

    res.status(200).json({
        message: "clud found",
        data: club
    })
   } catch (error) {
    res.status(404).json({
        message: error.message
    })
   }
}


const updateClub = async ( req, res ) => {
    try {
        const {league, clubName} = req.body;
        const clubId = req.params.id;
         const club = await clubModel.findById(clubId)
        const bodyData = {
            League: league || club.league,
            clubName: clubName || club.clubName,
            logo: club.logo
        }

        const result = await cloudinary.uploader.upload(req.file.path)
        if (req.file) {
            await cloudinary.uploader.destroy(club.logo)
            bodyData.logo = result.secure_url
        }
        else {
            const updatedClub = await clubModel.findByIdAndUpdate( clubId, bodyData, { new: true } )
                return res.status( 200 ).json( {
                    message: "Updated successfully.",
                    data: updatedClub
                })
        }
        
    } catch ( e ) {
        res.status(404).json( {
            message: e.message
        })
    }
}


// const updateClub = async ( req, res ) => {
//     const clubId = req.params.id;
//     const club = await clubModel.findById( clubId );
//     try {
//         const { league, clubName } = req.body;
//         const bodyData = {
//             league: league || club.league,
//             clubName: clubName || club.clubName,
//             // familyImage: family.familyImage
//         }

//         // if ( req.files && req.files[ "familyImage" ] ) {
//         //     const oldFamilyImagePath = uploads/${ family.familyImage }
//         //     if ( fs.existsSync( oldFamilyImagePath ) ) {
//         //         fs.unlinkSync(oldFamilyImagePath)
//         //     }
//         //     bodyData.familyImage = req.files.familyImage[ 0 ].filename;
//         // }
//         const newFamilyImage = await clubModel.findByIdAndUpdate( clubId, bodyData )
//             if ( newFamilyImage ) {
//                 res.status( 200 ).json( {
//                     message: "Updated successfully.",
//                     data: bodyData
//                 })
//             } else {
//                 res.status( 404 ).json( {
//                     message: "Not found"
//                 })
//             }
//     } catch ( e ) {
//         res.status( 500 ).json( {
//             message: e.message
//         })
//     }
// }

const deleteClub = async ( req, res ) => {
    try {
        const clubId = req.params.id;
        
        const deletedclub = await clubModel.findByIdAndDelete( clubId );
        if ( deletedclub ) {
            res.status( 200 ).json( {
                message: "Deleted successfully"
            })
        } else {
            res.status( 404 ).json( {
                message: "Your problem is bigger than our own"
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}


module.exports = {
    createClub,
    getAllClubs,
    getOneClub,
    updateClub,
    deleteClub
}