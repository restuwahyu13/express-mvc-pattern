import { autoInjectable, inject, injectAll, injectWithTransform, registry, container, delay } from 'tsyringe'
export { Service as Model, Container as Context } from 'typedi'
export { Repository, ObjectLiteral } from 'typeorm'
export { InjectRepository } from 'typeorm-typedi-extensions'
export { Router } from 'express'

export const Injectable = autoInjectable
export const Service = autoInjectable
export const Controller = autoInjectable
export const Route = autoInjectable
export const Inject = inject
export const InjectAll = injectAll
export const InjectTransform = injectWithTransform
export const Module = registry
export const Delay = delay
export const Container = container
