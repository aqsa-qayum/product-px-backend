const { DatabaseMapping } = require('../models');

exports.createMapping = async (req, res) => {
  try {
    const { userId, tableName, mappingFields } = req.body;

    if (!userId || !tableName || !mappingFields) {
      return res.status(400).json({ success: false, message: 'userId, tableName, and mappingFields are required.' });
    }

    const newMapping = await DatabaseMapping.create({
      userId,
      tableName,
      mappingFields
    });

    res.status(201).json({ success: true, data: newMapping });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getMappingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'Missing userId in query.' });
    }

    const mappings = await DatabaseMapping.findAll({
      where: { userId }
    });

    res.status(200).json({ success: true, data: mappings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateMapping = async (req, res) => {
  try {
    const { id } = req.params;
    const { mappingFields } = req.body;

    if (!mappingFields) {
      return res.status(400).json({ success: false, message: 'mappingFields are required to update.' });
    }

    const mapping = await DatabaseMapping.findByPk(id);

    if (!mapping) {
      return res.status(404).json({ success: false, message: 'Mapping not found.' });
    }

    mapping.mappingFields = mappingFields;
    await mapping.save();

    res.status(200).json({ success: true, data: mapping });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteMapping = async (req, res) => {
  try {
    const { id } = req.params;

    const mapping = await DatabaseMapping.findByPk(id);

    if (!mapping) {
      return res.status(404).json({ success: false, message: 'Mapping not found.' });
    }

    await mapping.destroy();
    res.status(200).json({ success: true, message: 'Mapping deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
