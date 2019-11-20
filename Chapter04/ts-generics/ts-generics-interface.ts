interface Logger<T> {
    debug(arg: T): T
    info(arg: T): T
    warn(arg: T): T
    error(arg: T): T
    fatal(arg: T): T
}

interface BasicLogger {
    log<T>(arg: T): T
}
