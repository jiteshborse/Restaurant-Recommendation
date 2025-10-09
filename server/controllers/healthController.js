const checkHealth = async (req, res) => {
    try {
        const healthData = {
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
            version: process.env.npm_package_version || '1.0.0'
        };

        res.json({
            success: true,
            data: healthData,
            message: 'Server is healthy'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                code: 'HEALTH_CHECK_ERROR',
                message: 'Health check failed'
            }
        });
    }
};

module.exports = {
    checkHealth
};