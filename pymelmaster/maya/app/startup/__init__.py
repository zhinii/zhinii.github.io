from pkgutil import extend_path
__path__ = extend_path(__path__, __name__)

# TODO: Delete this code once this version of pymel has been out for while!

# ok, we recently deleted some files (batch.py and gui.py) from pymel...
# ...however, some users may still have some pesky .pyc's lying around... and if
# they do, this will screw up things.  So, try to clean up any leftover .pyc's.

# HOWEVER - since we don't want to have to do this EVERY time this module is
# imported, we check the __file__ to see if this file is being run as a .pyc,
# and if NOT, we do the cleanup... this is a clever way to get "only run the
# first time" behavior...

# ...we also assume that if sys.dont_write_bytecode is set, we don't need to do
# cleanup... while this is technically not 100% foolproof, since if this is set
# python will still READ .pyc files which may have been generated by a previous
# run, it's a reasonably safe bet that if sys.dont_write_bytecode isn't set now,
# and we're running from a .py, it was probably always set, and there aren't any
# .pyc files to clean up
def _deleteOldBatchGuiPyc():
    import sys
    if __file__.lower().endswith('.py') and not sys.dont_write_bytecode:
        import os.path
        folder = os.path.dirname(__file__)
        for f in ('batch.pyc', 'gui.pyc'):
            path = os.path.join(folder, f)
            if os.path.isfile(path):
                try:
                    os.remove(path)
                except Exception:
                    pass
_deleteOldBatchGuiPyc()
