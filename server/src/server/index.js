const { app } = require('./server'); 
const getConnections = require('../../config/db/connection');
const { logger, logerror } = require('../helpers/logger');
const { variables: { PORT } } = require('../../config/index');
const seedProducts = require('./seedProducts');


const startServer = async () => {
    try {
        const message = await getConnections();
        logger.info(message);

        console.log('Seeding has started in the index file');
        await seedProducts();

        app.listen(PORT || 9000, () => {
            logger.info(`Server is listening on port ${PORT}`);
        });

        app.on('error', (err) => {
            logerror.error(`Server error: ${err}`);
            process.exit(1);
        });

    } catch (error) {
        logerror.error(`Failed to start server: ${error}`);
        process.exit(1);
    }
};


startServer();
