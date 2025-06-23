

const Annoncement = require("../models/Announcement");
const Demand = require("../models/Demand");

//get for all
const getAnnouncements = async (req, res) => {
    try {
        // Populate driver information to show user names
        const announcements = await Annoncement.find()
            .populate('driver', 'firstName lastName email') // Populate driver with name fields
            .sort({ createdAt: -1 }); // Sort by newest first
       
        if (announcements.length === 0) {
            return res.status(404).json({ error: "No announcements to display" });
        }
        
        res.status(200).json(announcements); // Use 200 for successful GET requests
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ error: error.message });
    }
};

//get all for driver
const getDriverAnnouncements = async (req, res) => {
    try {
        const announcements = await Annoncement.find({ driver: req.user._id })
            .populate('driver', 'firstName lastName email')
            .sort({ createdAt: -1 });
       
        if (announcements.length === 0) {
            return res.status(404).json({ error: "No announcements to display" });
        }
        
        res.status(200).json(announcements);
    } catch (error) {
        console.error('Error fetching driver announcements:', error);
        res.status(500).json({ error: error.message });
    }
};

//get one for all
const getAnnouncement = async (req, res) => {
    try {
        const announcement = await Annoncement.findById(req.params.id)
            .populate("driver", 'firstName lastName email');
       
        if (!announcement) {
            return res.status(404).json({ error: "Announcement not found" });
        }
       
        res.status(200).json(announcement);
    } catch (error) {
        console.error('Error fetching announcement:', error);
        res.status(500).json({ error: error.message });
    }
};

//post ou bien create annonce
const createAnnoncement = async (req, res) => {
    try {
        const {
            startPoint,
            waypoints,
            destination,
            maxDimensions,
            packageTypes,
            availableCapacity,
            startDate,
        } = req.body;

        // Debug log to see what we're receiving
        console.log('Received data:', {
            startPoint,
            waypoints,
            destination,
            maxDimensions,
            packageTypes,
            availableCapacity,
            startDate
        });

        // Validate and convert data
        const processedData = {
            driver: req.user._id,
            startPoint: startPoint?.trim(),
            destination: destination?.trim(),
            waypoints: Array.isArray(waypoints) ? waypoints : (waypoints ? [waypoints] : []),
            packageTypes: Array.isArray(packageTypes) ? packageTypes : (packageTypes ? [packageTypes] : []),
            maxDimensions: {
                length: Number(maxDimensions?.length) || 0,
                width: Number(maxDimensions?.width) || 0,
                height: Number(maxDimensions?.height) || 0
            },
            availableCapacity: Number(availableCapacity),
            startDate: new Date(startDate)
        };

        // Validate required fields
        if (!processedData.startPoint) {
            return res.status(400).json({ error: "Start point is required" });
        }
        if (!processedData.destination) {
            return res.status(400).json({ error: "Destination is required" });
        }
        if (!processedData.availableCapacity || processedData.availableCapacity <= 0) {
            return res.status(400).json({ error: "Valid available capacity is required" });
        }
        if (!processedData.startDate || isNaN(processedData.startDate.getTime())) {
            return res.status(400).json({ error: "Valid start date is required" });
        }

        console.log('Processed data:', processedData);

        const announcement = new Annoncement(processedData);
        const savedAnnouncement = await announcement.save();
        
        // Return the saved announcement with populated driver info
        const populatedAnnouncement = await Annoncement.findById(savedAnnouncement._id)
            .populate('driver', 'firstName lastName email');

        console.log('Saved announcement:', populatedAnnouncement);

        res.status(201).json({ 
            message: "Announcement created successfully!",
            announcement: populatedAnnouncement
        });
    } catch (error) {
        console.error('Error creating announcement:', error);
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: validationErrors.join(', ') });
        }
        res.status(400).json({ error: error.message });
    }
};

const updateAnnouncement = async (req, res) => {
    try {
        const updatedAnnouncement = await Annoncement.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },                 //رجع ليا الإعلان بعد التحديثnew
            { new: true, runValidators: true } //التحقق من البياناتrun 
        ).populate("driver", 'firstName lastName email');
        
        if (!updatedAnnouncement) {
            return res.status(404).json({ error: "Announcement not found" });
        }
        
        res.status(200).json(updatedAnnouncement);
    } catch (error) {
        console.error('Error updating announcement:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Annoncement.findOne({ 
            _id: req.params.id, 
            driver: req.user._id 
        });
        
        if (!announcement) {
            return res.status(404).json({ error: "Announcement not found" });
        }
        
        // Cancel related pending demands
        await Demand.updateMany(
            { announcement: announcement._id, status: "pending" },
            { status: "cancelled" }
        );
        
        await Annoncement.findByIdAndDelete(req.params.id);
        
        res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
        console.error('Error deleting announcement:', error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = { 
    getAnnouncement, 
    getAnnouncements, 
    getDriverAnnouncements, 
    createAnnoncement, 
    updateAnnouncement, 
    deleteAnnouncement,  
};