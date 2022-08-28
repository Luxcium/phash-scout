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
export enum DebugLevels {
  /**
   * **DEBUG** → Relatively detailed tracing used by application
   * developers. The exact meaning of the three debug levels varies
   * among subsystems.
   */
  'DEBUG' = 10_000,

  /**
   * **DEBUG** (*LOW*) → Information broadly interesting to
   * developers who do not have a specialized interest in the
   * specific subsystem. Might include minor (recoverable) failures
   * and issues indicating potential performance problems.
   */
  'LOW' = 20_000,

  /**
   * **DEBUG** (*MEDIUM*) → Fairly detailed tracing messages.
   * Calls for entering, returning, or throwing an exception are
   * traced at this level.
   */
  'MEDIUM' = 30_000,

  /**
   * **DEBUG** (*HIGH*) → Highly detailed tracing messages.
   * Produces the most voluminous output.
   */
  'HIGH' = 70_000,
}
