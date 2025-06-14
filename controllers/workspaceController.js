const { Workspace } = require('../models');

exports.createWorkspace = async (req, res) => {
  const { name, mappedMethod, licenseStatus } = req.body;
  try {
    const workspace = await Workspace.create({ name, mappedMethod, licenseStatus });

    res.status(201).json({ success: true, data: workspace });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getWorkspace = async (req, res) => {
  try {
    const workspaces = await Workspace.findAll();
    res.status(200).json({ success: true, data: workspaces });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};