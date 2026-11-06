"""Make private pip-installed CUDA libraries visible before importing llama.cpp."""
import ctypes
import os
import site
import sys
from pathlib import Path

handles = []

def activate():
    roots = [Path(root, 'nvidia') for root in site.getsitepackages()]
    if sys.platform == 'win32':
        for folder in sorted({file.parent for root in roots for file in root.rglob('*.dll')}):
            handles.append(os.add_dll_directory(str(folder)))
        return
    if not sys.platform.startswith('linux'):
        return
    # Dependencies must be globally loaded before libcublas and libggml-cuda.
    for name in ('libcudart.so.13', 'libcublasLt.so.13', 'libcublas.so.13'):
        for root in roots:
            candidates = sorted(root.rglob(name))
            if candidates:
                handles.append(ctypes.CDLL(str(candidates[0]), mode=ctypes.RTLD_GLOBAL))
                break
