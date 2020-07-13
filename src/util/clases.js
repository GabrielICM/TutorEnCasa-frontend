const HistoryStatusClassStatus = {
    UNPAY: 0,
    0: 'Sin Pagar',
    PAY: 1,
    1: 'Pagado',
    CANCELL: 2,
    2: 'Cancelado',
    FINISHED: 3,
    3: 'Terminado',
}

const showClassStatus = (status) => {
    switch(status) {
        case HistoryStatusClassStatus.UNPAY:
            return HistoryStatusClassStatus[0];
        case HistoryStatusClassStatus.PAY:
            return HistoryStatusClassStatus[1];
        case HistoryStatusClassStatus.CANCELL:
            return HistoryStatusClassStatus[2];
        case HistoryStatusClassStatus.FINISHED:
            return HistoryStatusClassStatus[3];
    }
}

export {
    showClassStatus
}

export default HistoryStatusClassStatus;