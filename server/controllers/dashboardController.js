//import Note model
const Note = require("../models/Notes");
// Import the mongoose library for MongoDB interactions
const mongoose = require("mongoose");

/**
 * GET /
 * Dashboard
 */
exports.dashboard = async (req, res) => {
// Set up pagination variables
  let perPage = 12;
  let page = req.query.page || 1;

  const locals = {
    title: "Dashboard",
    description: "Free NodeJS Notes App.",
  };

 
  try {
// Aggregate and retrieve notes with pagination
    const notes = await Note.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      }
      ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(); 
   // Get total count of user-specific notes for pagination
    const count = await Note.countDocuments({ user: new mongoose.Types.ObjectId(req.user.id) });


    res.render('dashboard/index', {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage)
    });

  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * View Specific Note
 */
exports.dashboardViewNote = async (req, res) => {
    // Find and render a specific note for viewing
    const note = await Note.findById({ _id: req.params.id })
      .where({ user: req.user.id })
      .lean();
  
    if (note) {
      res.render("dashboard/view-note", {
        noteID: req.params.id,
        note,
        layout: "../views/layouts/dashboard",
      });
    } else {
      res.send("Something went wrong.");
    }
  };
  
  /**
   * PUT /
   * Update Specific Note
   */
  exports.dashboardUpdateNote = async (req, res) => {
     // Update a specific note and redirect to the dashboard
    try {
      await Note.findOneAndUpdate(
        { _id: req.params.id },
        { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
      ).where({ user: req.user.id });
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  
  /**
   * DELETE /
   * Delete Note
   */
  exports.dashboardDeleteNote = async (req, res) => {
    // Delete a specific note and redirect to the dashboard
    try {
      await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  
/**
 * GET /
 * Add Notes
 */
exports.dashboardAddNote = async (req, res) => {
    // Render the add note view
    res.render("dashboard/add", {
      layout: "../views/layouts/dashboard",
    });
  };
/**
 * POST /
 * Add Notes
 */
exports.dashboardAddNoteSubmit = async (req, res) => {
    try {
      // Create and add a new note, then redirect to the dashboard
      req.body.user = req.user.id;
      await Note.create(req.body);
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
/**
 * GET /
 * Search
 */
exports.dashboardSearch = async (req, res) => {
   // Render the search view with empty search results
    try {
      res.render("dashboard/search", {
        searchResults: "",
        layout: "../views/layouts/dashboard",
      });
    } catch (error) {}
  };
  
  /**
   * POST /
   * Search For Notes
   */
  exports.dashboardSearchSubmit = async (req, res) => {
     // Search for notes based on the provided search term and render the search results
    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const searchResults = await Note.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
          { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        ],
      }).where({ user: req.user.id });
  
      res.render("dashboard/search", {
        searchResults,
        layout: "../views/layouts/dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  };
