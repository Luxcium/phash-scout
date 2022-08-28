// %- Understanding logging levels -------------------------------- -%
/**
 * ### Understanding logging levels
 * Each log message has an associated log level that gives a rough
 * guide to the importance and urgency of the message. Each level has
 * an associated integer value usable by rules that monitor system
 * messages.
 *
 * Higher values indicate higher priorities. As such, a rule might
 * look for Error and Fatal messages by looking for values lower than
 * or equal to 2000 (Level >= 2000).
 *
 * You might want to increase the logging level of a logger to
 * diagnose or debug a problem. The default level for all loggers is
 * Inherit, and the default level for the root logger is Info.
 *
 * Do not turn on Debug or higher logging without direction from
 * technical support. Turning on this excessive logging for high
 * module like system, query, or exec can rapidly flood your system
 * and terminate the servers.
 */
export enum VerboLevels {
  /**
   * **Off** → No logging.
   */
  'Off' = -1,

  /**
   * **Inherit** → Inherit the level from the parent logger.
   */
  'Inherit' = 0,

  /**
   * **LOG** → Normal operation output using process.stderr.write
   * to output to the consosole.
   */
  'LOG' = 1,

  /**
   * **FATAL** → Very severe error events that might cause the
   * application to terminate.
   */
  'FATAL' = 1000,

  /**
   * **ERROR** → Error events of considerable importance that will
   * prevent normal program execution, but might still allow the
   * application to continue running.
   */
  'ERROR' = 2000,

  /**
   * **WARN** → Potentially harmful situations of interest to end
   * users or system managers that indicate potential problems.
   */
  'WARN' = 3000,

  /**
   * **INFO** → Informational messages that might make sense to end
   * users and system administrators, and highlight the progress of
   * the application.
   */
  'INFO' = 7000,

  /**
   * **All** → All messages.
   */
  'All' = 110_000,
}
