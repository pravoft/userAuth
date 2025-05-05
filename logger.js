const {createLogger, transports, format} = require("winston")

const logger = createLogger({
    transports: [ 
            new transports.Console({
            level:'info',
            format:format.combine(format.timestamp(), format.simple())
            // format:format.combine(format.timestamp(), format.json())
        })
    ]

    // new transports.File({
    //     filename : "info.log",
    //     level:'info',
    //     format:format.combine(format.timestamp(), format.simple())
    //     // format:format.combine(format.timestamp(), format.json())
    // })
        // new transports.MongoDB({
        //     level:'error',
        //     db:process.env.DATABASE_URI,
        //     collection:'info',
        //     format:format.combine(format.timestamp(), format.simple())

        // })
})

module.exports = logger