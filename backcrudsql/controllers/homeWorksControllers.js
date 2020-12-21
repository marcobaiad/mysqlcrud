const pool = require('../dataBaseConnection');

exports.allHomeworks = async (req, res) => {
    try {
        const homeworks = await pool.query('SELECT * FROM homeworks')
        res.send(homeworks)
    } catch (error) {
        console.log(error);
        res.send
    }
}

exports.addHomework = async (req, res) => {
    try {
        const { work, description, daytoready, state } = req.body;
        const newHomeWork = {
            work,
            description,
            daytoready,
            state
        }
        await pool.query('INSERT INTO homeworks set ?', [newHomeWork])
        res.send('New homework has Received')
    } catch (error) {
        console.log('Error to add homework', error);
        res.send('Some error has ocurred when try to add Homework', error)
    }
}

exports.editHomework = async (req, res) => {

    try {
        const { id } = req.params;
        const { work, description, daytoready, state } = req.body;
        const newHomeWork = {
            work,
            description,
            daytoready,
            state
        }
        await pool.query('UPDATE homeworks set ? WHERE ID = ?', [newHomeWork, id])
        res.send('Edit successfully')
    } catch (error) {
        console.log(error);
        res.send('Some error has ocurred when try to edit a Homework', error)
    }

}

exports.deleteHomework = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        await pool.query('DELETE FROM homeworks WHERE ID = ?', [id])
        res.send('Homework is deleted')
    } catch (error) {
        console.log(error);
        res.send('Some error has ocurred when try to delete Homework', error)
    }
}