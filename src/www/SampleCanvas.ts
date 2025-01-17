import { CustomElementProperties, HTMLCanvasProperties, createCustomElement, html, useConnected } from "lithos"
import { GPUContext } from "../core/GPUContext.js"
import { GPUComponent } from "../render/GPUComponent.js"

interface SampleProperties extends CustomElementProperties {
    width?: number
    height?: number
    create(c: GPUContext): Promise<GPUComponent>
}

export const SampleCanvas = createCustomElement(function (props: SampleProperties) {
    const { width = 320, height = 240, create, ...rest } = props
    useConnected(() => {
        let component: GPUComponent
        (async () => {
            let c = await GPUContext.create(this)
            component = await create(c)
            const frame = () => {
                let animated = component.update?.(c)
                component.render(c)
                if (animated) {
                    requestAnimationFrame(frame)
                }
                this.dispatchEvent(new CustomEvent("frame", { bubbles: true }))
            }
            frame()
        })()

        return () => {
            console.log("DESTROY", component)
            component?.destroy()
        }
    })

    return html.Canvas({
        width, height,
        style: { border: "solid 1px black", background: "beige" },
        ...rest
    })
}, { extends: "canvas" })
