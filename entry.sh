#!/bin/sh

    ACTIVE_CMD_SCRIPT="${CMD_SCRIPT:-jwtstart1}"

    echo "-------------------------------------------"
    echo "ACTIVE_CMD_SCRIPT=${ACTIVE_CMD_SCRIPT}"
    echo "-------------------------------------------"
    
    exec npm run ${ACTIVE_CMD_SCRIPT}