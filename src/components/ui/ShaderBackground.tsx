"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../layout/ThemeProvider";

// Predefined palette matching the site colors
const colors = {
    dark: {
        bg: [11 / 255, 1 / 255, 24 / 255],     // #0b0118 (deep background-950)
        c1: [112 / 255, 13 / 255, 242 / 255],   // #700df2 (primary-500)
        c2: [241 / 255, 14 / 255, 173 / 255],   // #f10ead (secondary-500)
        c3: [33 / 255, 150 / 255, 243 / 255],   // #2196f3 (blue from hero state)
        c4: [247 / 255, 110 / 255, 160 / 255]   // #f76ea0 (accent-300)
    },
    light: {
        bg: [241 / 255, 231 / 255, 254 / 255],  // #f1e7fe (background-50)
        c1: [211 / 255, 187 / 255, 255 / 255],  // #d3bbff (primary-200)
        c2: [252 / 255, 207 / 255, 239 / 255],  // #fccfef (secondary-100)
        c3: [187 / 255, 222 / 255, 251 / 255],  // #bbdefb (blue-100)
        c4: [255 / 255, 236 / 255, 179 / 255]   // #ffecb3 (warm/amber-100)
    }
};

const vertexShaderSource = `
    attribute vec2 position;
    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const fragmentShaderSource = `
    precision mediump float;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec3 u_color_bg;
    uniform vec3 u_color1;
    uniform vec3 u_color2;
    uniform vec3 u_color3;
    uniform vec3 u_color4;

    float rand(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        
        // Circular trajectories for color blobs
        vec2 p1 = vec2(
            0.25 + 0.15 * sin(u_time * 0.12),
            0.30 + 0.12 * cos(u_time * 0.08)
        );
        vec2 p2 = vec2(
            0.75 + 0.18 * cos(u_time * 0.10),
            0.70 + 0.14 * sin(u_time * 0.15)
        );
        vec2 p3 = vec2(
            0.35 + 0.20 * sin(u_time * 0.09 + 2.0),
            0.75 + 0.10 * cos(u_time * 0.13 + 1.0)
        );
        vec2 p4 = vec2(
            0.65 + 0.15 * cos(u_time * 0.14 + 3.0),
            0.25 + 0.18 * sin(u_time * 0.11 + 4.0)
        );

        float d1 = length(uv - p1);
        float d2 = length(uv - p2);
        float d3 = length(uv - p3);
        float d4 = length(uv - p4);

        float w1 = smoothstep(0.7, 0.0, d1);
        float w2 = smoothstep(0.65, 0.0, d2);
        float w3 = smoothstep(0.8, 0.0, d3);
        float w4 = smoothstep(0.7, 0.0, d4);

        float sum_w = w1 + w2 + w3 + w4 + 0.001;

        vec3 mixed_color = (u_color1 * w1 + u_color2 * w2 + u_color3 * w3 + u_color4 * w4) / sum_w;
        
        // Subtly mix the animated mesh with the background base
        vec3 color = mix(u_color_bg, mixed_color, 0.12);

        // Add subtle film grain noise
        float grain = rand(uv + fract(u_time * 0.0005)) * 0.015 - 0.0075;
        color += vec3(grain);

        gl_FragColor = vec4(color, 1.0);
    }
`;

export default function ShaderBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { theme } = useTheme();
    const [webglSupported, setWebglSupported] = useState(true);

    const currentColors = useRef({
        bg: [...colors.dark.bg],
        c1: [...colors.dark.c1],
        c2: [...colors.dark.c2],
        c3: [...colors.dark.c3],
        c4: [...colors.dark.c4]
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = (canvas.getContext("webgl", {
            alpha: false,
            depth: false,
            stencil: false,
            antialias: true,
            powerPreference: "low-power"
        }) || canvas.getContext("experimental-webgl", {
            alpha: false,
            depth: false,
            stencil: false,
            antialias: true,
            powerPreference: "low-power"
        })) as WebGLRenderingContext | null;

        if (!gl) {
            console.warn("WebGL not supported. Falling back to CSS gradients.");
            setWebglSupported(false);
            return;
        }

        // WebGL Compile Helper
        const compile = (source: string, type: number) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vs = compile(vertexShaderSource, gl.VERTEX_SHADER);
        const fs = compile(fragmentShaderSource, gl.FRAGMENT_SHADER);
        if (!vs || !fs) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program));
            return;
        }

        gl.useProgram(program);

        // Screen Quad vertices
        const vertices = new Float32Array([
            -1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
            -1.0,  1.0,
             1.0, -1.0,
             1.0,  1.0
        ]);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Retrieve uniform locations
        const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
        const timeLoc = gl.getUniformLocation(program, "u_time");
        const bgLoc = gl.getUniformLocation(program, "u_color_bg");
        const c1Loc = gl.getUniformLocation(program, "u_color1");
        const c2Loc = gl.getUniformLocation(program, "u_color2");
        const c3Loc = gl.getUniformLocation(program, "u_color3");
        const c4Loc = gl.getUniformLocation(program, "u_color4");

        let animationFrameId: number;
        let startTime = performance.now();

        // Resize function
        const resize = () => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                gl.viewport(0, 0, width, height);
            }
        };

        window.addEventListener("resize", resize);
        resize();

        // Determine active target palette
        const getActiveTarget = () => {
            const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
            return isDark ? colors.dark : colors.light;
        };

        // Initialize transition colors immediately on mount to prevent flash
        const initialTarget = getActiveTarget();
        currentColors.current = {
            bg: [...initialTarget.bg],
            c1: [...initialTarget.c1],
            c2: [...initialTarget.c2],
            c3: [...initialTarget.c3],
            c4: [...initialTarget.c4]
        };

        // Render loop
        const render = () => {
            const time = (performance.now() - startTime) / 1000;
            const target = getActiveTarget();

            // Smoothly interpolate colors (approx. 5% change per frame)
            const lerp = (cur: number[], tgt: number[]) => {
                for (let i = 0; i < 3; i++) {
                    cur[i] += (tgt[i] - cur[i]) * 0.05;
                }
            };
            lerp(currentColors.current.bg, target.bg);
            lerp(currentColors.current.c1, target.c1);
            lerp(currentColors.current.c2, target.c2);
            lerp(currentColors.current.c3, target.c3);
            lerp(currentColors.current.c4, target.c4);

            // Pass uniforms to shader
            gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
            gl.uniform1f(timeLoc, time);
            gl.uniform3fv(bgLoc, currentColors.current.bg);
            gl.uniform3fv(c1Loc, currentColors.current.c1);
            gl.uniform3fv(c2Loc, currentColors.current.c2);
            gl.uniform3fv(c3Loc, currentColors.current.c3);
            gl.uniform3fv(c4Loc, currentColors.current.c4);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
            gl.deleteBuffer(buffer);
            gl.deleteProgram(program);
        };
    }, [theme]);

    if (!webglSupported) {
        // Subtle CSS fallback if WebGL is unavailable
        return (
            <div className="absolute inset-0 z-0 bg-background transition-colors duration-1000">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_20%_20%,var(--primary)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,var(--secondary)_0%,transparent_50%)] blur-[80px]" />
            </div>
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-1000"
            style={{ opacity: 0.85 }}
        />
    );
}
