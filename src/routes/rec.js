const express = require('express');
const router = express.Router();

const pool = require('../database');
const { database } = require('../keys');
const { isLoggedIn } = require('../lib/auth');

router.get('/agrRecipiente', isLoggedIn, (req, res) => {
    res.render('rec/agrRecipiente');
});

router.post('/agrRecipiente', isLoggedIn, async (req, res) => {
    const { numero, tipo, capacidad, estado, contenido, sector } = req.body;
    const newRecipiente = {
        numero,
        tipo,
        capacidad,
        estado,
        contenido,
        sector

    };
    try {
        if ((newRecipiente.numero.length) > 0) {
            await pool.query('INSERT INTO recipiente set ?', [newRecipiente]);
            res.redirect('/rec');
        }    
    } catch (error) {
        req.flash('message', 'Error al guardar recipiente');
        res.redirect('/rec/agrRecipiente');
    }  
});

router.get('/', isLoggedIn, async (req, res) => {
    const recipientes = await pool.query('SELECT * FROM recipiente ORDER BY numero');
    res.render('rec/list', {recipientes});
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM recipiente WHERE ID = ?', [id]);
    res.redirect('/rec');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const recipientes = await pool.query('SELECT * FROM recipiente WHERE ID = ?', [id]);
    res.render('rec/edit', {recipiente: recipientes[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { numero, tipo, capacidad, estado, contenido, sector } = req.body;
    const newRecipiente = {
        numero,
        tipo,
        capacidad,
        estado,
        contenido,
        sector
    };
    try {
        if ((newRecipiente.numero.length) > 0) {
            await pool.query('UPDATE recipiente set ? WHERE id = ?', [newRecipiente, id]);
            res.redirect('/rec');
        }    
    } catch (error) {
        req.flash('message', 'Error al guardar recipiente');
        res.redirect('/rec');
    }  

});


module.exports = router;