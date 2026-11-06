import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / 'runtime/models'))
import cuda_libraries

class CudaLibraryTests(unittest.TestCase):
    def tearDown(self):
        cuda_libraries.handles.clear()

    def test_linux_preloads_private_libraries_in_dependency_order(self):
        with tempfile.TemporaryDirectory() as folder:
            names=['libcudart.so.13','libcublasLt.so.13','libcublas.so.13']
            for name in names:
                path=Path(folder,'nvidia','private','lib',name)
                path.parent.mkdir(parents=True,exist_ok=True)
                path.touch()
            with patch.object(sys,'platform','linux'), patch('cuda_libraries.site.getsitepackages',return_value=[folder]), patch('cuda_libraries.ctypes.CDLL') as load:
                cuda_libraries.activate()
                self.assertEqual([Path(call.args[0]).name for call in load.call_args_list],names)
                self.assertEqual(len(cuda_libraries.handles),3)

    def test_macos_does_not_load_cuda_libraries(self):
        with patch.object(sys,'platform','darwin'), patch('cuda_libraries.ctypes.CDLL') as load:
            cuda_libraries.activate()
            load.assert_not_called()

    def test_windows_retains_dll_directory_handles(self):
        with tempfile.TemporaryDirectory() as folder:
            path=Path(folder,'nvidia','cublas','bin','cublas64_13.dll')
            path.parent.mkdir(parents=True);path.touch()
            with patch.object(sys,'platform','win32'), patch('cuda_libraries.site.getsitepackages',return_value=[folder]), patch('cuda_libraries.os.add_dll_directory',create=True) as add:
                cuda_libraries.activate()
                add.assert_called_once_with(str(path.parent))
                self.assertEqual(cuda_libraries.handles,[add.return_value])
